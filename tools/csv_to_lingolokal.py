#!/usr/bin/env python3
"""
csv_to_lingolokal.py - Konverter CSV / Excel (NGSL 1.2, NAWL, Oxford, dll.)
menjadi file JSON schema_version "1.0" siap impor ke LingoLokal.
"""
from __future__ import annotations

import argparse
import csv
import json
import pathlib
import random
import re
import sys
from typing import Dict, List, Optional, Tuple

LANG_META: Dict[str, Dict[str, object]] = {
    "en": {"name_id": "Inggris", "name_native": "English", "tts_lang": "en-US", "script_type": "latin", "phonetic_input": "none", "roadmap_levels": ["A0", "A1", "A2", "B1", "B2", "C1", "C2"]},
    "ja": {"name_id": "Jepang", "name_native": "日本語", "tts_lang": "ja-JP", "script_type": "hiragana_katakana_kanji", "phonetic_input": "romaji_to_kana", "roadmap_levels": ["A0", "N5", "N4", "N3", "N2", "N1"]},
    "ko": {"name_id": "Korea", "name_native": "한국어", "tts_lang": "ko-KR", "script_type": "hangul", "phonetic_input": "latin_to_hangul", "roadmap_levels": ["A0", "A1", "A2", "B1", "B2", "C1", "C2"]},
    "zh": {"name_id": "Mandarin", "name_native": "中文", "tts_lang": "zh-CN", "script_type": "hanzi", "phonetic_input": "pinyin_to_hanzi", "roadmap_levels": ["A0", "HSK1", "HSK2", "HSK3", "HSK4", "HSK5", "HSK6"]},
    "de": {"name_id": "Jerman", "name_native": "Deutsch", "tts_lang": "de-DE", "script_type": "latin", "phonetic_input": "none", "roadmap_levels": ["A0", "A1", "A2", "B1", "B2", "C1", "C2"]},
    "ar": {"name_id": "Arab", "name_native": "العربية", "tts_lang": "ar-SA", "script_type": "arabic", "phonetic_input": "none", "roadmap_levels": ["A0", "A1", "A2", "B1", "B2", "C1", "C2"]},
    "es": {"name_id": "Spanyol", "name_native": "Español", "tts_lang": "es-ES", "script_type": "latin", "phonetic_input": "none", "roadmap_levels": ["A0", "A1", "A2", "B1", "B2", "C1", "C2"]},
    "fr": {"name_id": "Prancis", "name_native": "Français", "tts_lang": "fr-FR", "script_type": "latin", "phonetic_input": "none", "roadmap_levels": ["A0", "A1", "A2", "B1", "B2", "C1", "C2"]},
    "nl": {"name_id": "Belanda", "name_native": "Nederlands", "tts_lang": "nl-NL", "script_type": "latin", "phonetic_input": "none", "roadmap_levels": ["A0", "A1", "A2", "B1", "B2", "C1", "C2"]},
    "ru": {"name_id": "Rusia", "name_native": "Русский", "tts_lang": "ru-RU", "script_type": "cyrillic", "phonetic_input": "latin_to_cyrillic", "roadmap_levels": ["A0", "A1", "A2", "B1", "B2", "C1", "C2"]},
    "th": {"name_id": "Thailand", "name_native": "ภาษาไทย", "tts_lang": "th-TH", "script_type": "thai", "phonetic_input": "none", "roadmap_levels": ["A0", "A1", "A2", "B1", "B2", "C1", "C2"]},
}

WORD_ALIASES = ("lemma", "headword", "word", "front", "term", "english", "kata", "vocabulary")
MEANING_ALIASES = ("meaning_id", "meaning", "definition", "def", "arti", "translation", "terjemahan", "gloss", "simple definition")
READING_ALIASES = ("ipa", "romaji", "reading", "pronunciation", "pinyin", "cara_baca")
EXAMPLE_ALIASES = ("example", "example_native", "sentence", "contoh", "context")
LEVEL_ALIASES = ("level", "cefr", "band", "grade")


def slugify(text: str) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
    return s or "pack"


def detect_column(headers: List[str], aliases: Tuple[str, ...]) -> Optional[int]:
    lowered = [h.strip().lower() for h in headers]
    for alias in aliases:
        if alias in lowered:
            return lowered.index(alias)
    for idx, h in enumerate(lowered):
        if any(alias in h for alias in aliases):
            return idx
    return None


def read_rows(input_path: pathlib.Path) -> Tuple[List[str], List[List[str]]]:
    ext = input_path.suffix.lower()
    if ext in (".xlsx", ".xlsm"):
        try:
            import openpyxl  # type: ignore
        except ImportError:
            sys.exit("Error: Untuk membaca file .xlsx diperlukan 'openpyxl'.")
        wb = openpyxl.load_workbook(input_path, read_only=True, data_only=True)
        ws = wb.active
        all_rows = [[("" if cell is None else str(cell).strip()) for cell in row] for row in ws.iter_rows(values_only=True)]
        wb.close()
    else:
        with input_path.open("r", encoding="utf-8-sig", newline="") as f:
            sample = f.read(4096)
            f.seek(0)
            try:
                dialect = csv.Sniffer().sniff(sample, delimiters=",;\t")
            except csv.Error:
                dialect = csv.excel
            all_rows = [[c.strip() for c in row] for row in csv.reader(f, dialect)]

    non_empty = [r for r in all_rows if any(cell.strip() for cell in r)]
    if len(non_empty) < 2:
        sys.exit("Error: File input kosong atau hanya memiliki 1 baris.")
    return non_empty[0], non_empty[1:]


def assign_progressive_level(index: int, total: int, levels: List[str], fixed_level: Optional[str]) -> str:
    if fixed_level:
        return fixed_level
    usable = [lv for lv in levels if lv != "A0"] or levels
    ratio = index / max(1, total)
    bucket = min(len(usable) - 1, int(ratio * len(usable)))
    return usable[bucket]


def build_quizzes_for_module(module_id: str, cards: List[Dict[str, object]], quizzes_per_module: int, rng: random.Random) -> List[Dict[str, object]]:
    usable = [c for c in cards if c["meaning_id"] and c["meaning_id"] != "(Isi arti kata ini)"]
    if len(usable) < 4:
        return []
    quizzes: List[Dict[str, object]] = []
    sampled = rng.sample(usable, min(len(usable), max(4, quizzes_per_module)))
    mc_count = max(1, quizzes_per_module - 2)
    for i, target in enumerate(sampled[:mc_count], start=1):
        distractors = [c["meaning_id"] for c in usable if c["id"] != target["id"] and c["meaning_id"] != target["meaning_id"]]
        if len(distractors) < 3:
            continue
        options = [str(target["meaning_id"])] + [str(d) for d in rng.sample(distractors, 3)]
        rng.shuffle(options)
        quizzes.append({
            "id": f"{module_id}-qz-mc-{i:02d}",
            "module_id": module_id,
            "type": "multiple_choice",
            "prompt": f"Apa arti yang paling tepat untuk kata \"{target['front']}\"?",
            "options": options,
            "answer": str(target["meaning_id"]),
            "explanation_id": f"\"{target['front']}\" berarti: {target['meaning_id']}.",
        })
    match_cards = rng.sample(usable, 4)
    quizzes.append({
        "id": f"{module_id}-qz-match-01",
        "module_id": module_id,
        "type": "matching",
        "prompt": "Pasangkan kosakata berikut dengan arti yang sesuai:",
        "pairs": [{"left": str(c["front"]), "right": str(c["meaning_id"])} for c in match_cards],
        "explanation_id": "Menguji ingatan cepat pasangan kata dan makna dalam satu set.",
    })
    tr_target = sampled[-1]
    quizzes.append({
        "id": f"{module_id}-qz-tr-01",
        "module_id": module_id,
        "type": "translation",
        "prompt": f"Ketik kosakata target yang memiliki arti: \"{tr_target['meaning_id']}\"",
        "accepted_answers": [str(tr_target["front"]), str(tr_target["front"]).lower()],
        "explanation_id": f"Jawaban yang tepat adalah \"{tr_target['front']}\".",
    })
    return quizzes


def convert(input_path: pathlib.Path, output_path: pathlib.Path, lang_code: str, pack_name: str, chunk_size: int, max_words: Optional[int], level_default: Optional[str], quizzes_per_module: int, seed: int) -> None:
    if lang_code not in LANG_META:
        sys.exit(f"Error: Kode bahasa '{lang_code}' tidak dikenali.")
    headers, rows = read_rows(input_path)
    word_col = detect_column(headers, WORD_ALIASES)
    meaning_col = detect_column(headers, MEANING_ALIASES)
    reading_col = detect_column(headers, READING_ALIASES)
    example_col = detect_column(headers, EXAMPLE_ALIASES)
    level_col = detect_column(headers, LEVEL_ALIASES)
    if word_col is None:
        word_col = 0
        if meaning_col is None and len(headers) >= 2:
            meaning_col = 1

    meta = LANG_META[lang_code]
    levels: List[str] = list(meta["roadmap_levels"])  # type: ignore
    pack_slug = slugify(pack_name)
    seen = set()
    entries: List[Dict[str, str]] = []
    for row in rows:
        if word_col >= len(row):
            continue
        word = row[word_col].strip()
        if not word or word.lower() in seen:
            continue
        seen.add(word.lower())
        entries.append({
            "word": word,
            "meaning": (row[meaning_col].strip() if (meaning_col is not None and meaning_col < len(row)) else "") or "(Isi arti kata ini)",
            "reading": row[reading_col].strip() if (reading_col is not None and reading_col < len(row)) else "",
            "example": row[example_col].strip() if (example_col is not None and example_col < len(row)) else "",
            "level": row[level_col].strip().upper() if (level_col is not None and level_col < len(row)) else "",
        })
        if max_words and len(entries) >= max_words:
            break
    if not entries:
        sys.exit("Error: Tidak ada kata yang berhasil diekstrak dari file input.")

    rng = random.Random(seed)
    modules, flashcards, quizzes = [], [], []
    total = len(entries)
    for chunk_idx in range(0, total, chunk_size):
        chunk = entries[chunk_idx : chunk_idx + chunk_size]
        part_num = (chunk_idx // chunk_size) + 1
        start_rank, end_rank = chunk_idx + 1, chunk_idx + len(chunk)
        mod_level = chunk[0]["level"] if (chunk[0]["level"] in levels) else assign_progressive_level(chunk_idx, total, levels, level_default)
        mod_id = f"{lang_code}-{pack_slug}-m{part_num:03d}"
        modules.append({
            "id": mod_id,
            "level": mod_level,
            "order": 100 + part_num,
            "title": f"{pack_name} #{part_num}: Kosakata {start_rank}-{end_rank}",
            "category": pack_slug,
            "estimated_minutes": max(15, min(35, len(chunk) // 2)),
            "objectives": [
                f"Menguasai {len(chunk)} kosakata inti peringkat {start_rank}-{end_rank} dari {pack_name}",
                "Melatih ingatan aktif melalui Flashcard SRS SM-2 dan quiz otomatis",
            ],
        })
        mod_cards = []
        for offset, item in enumerate(chunk, start=1):
            card = {
                "id": f"{mod_id}-fc-{offset:03d}",
                "module_id": mod_id,
                "level": item["level"] if (item["level"] in levels) else mod_level,
                "category": pack_slug,
                "front": item["word"],
                "reading": item["word"],
                "romaji": item["reading"],
                "meaning_id": item["meaning"],
                "mnemonic": f"{pack_name} · Peringkat #{chunk_idx + offset}",
                "example_native": item["example"],
                "example_romaji": "",
                "example_id": "",
                "srs": {"ease_factor": 2.5, "interval_days": 0, "repetitions": 0, "due_date": None},
            }
            mod_cards.append(card)
            flashcards.append(card)
        if quizzes_per_module > 0:
            quizzes.extend(build_quizzes_for_module(mod_id, mod_cards, quizzes_per_module, rng))

    payload = {
        "schema_version": "1.0",
        "language": {
            "code": lang_code, "name_id": meta["name_id"], "name_native": meta["name_native"],
            "tts_lang": meta["tts_lang"], "script_type": meta["script_type"],
            "phonetic_input": meta["phonetic_input"], "roadmap_levels": levels,
        },
        "modules": modules, "flashcards": flashcards, "quizzes": quizzes,
        "dialogs": [], "readings": [], "grammar": [],
    }
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"SELESAI -> {output_path} ({len(modules)} modul, {len(flashcards)} kartu, {len(quizzes)} quiz)")


def main() -> None:
    parser = argparse.ArgumentParser(description="Konverter CSV/Excel ke JSON schema_version 1.0 LingoLokal.")
    parser.add_argument("input_file", type=pathlib.Path)
    parser.add_argument("-o", "--output", type=pathlib.Path, default=None)
    parser.add_argument("--lang", default="en")
    parser.add_argument("--pack-name", default="NGSL Core")
    parser.add_argument("--chunk-size", type=int, default=50)
    parser.add_argument("--max-words", type=int, default=None)
    parser.add_argument("--level-default", default=None)
    parser.add_argument("--quizzes-per-module", type=int, default=5)
    parser.add_argument("--seed", type=int, default=42)
    args = parser.parse_args()
    if not args.input_file.exists():
        sys.exit(f"Error: File tidak ditemukan: {args.input_file}")
    out_path = args.output or args.input_file.with_name(f"lingolokal_{slugify(args.pack_name)}_{args.lang}.json")
    convert(args.input_file, out_path, args.lang.lower(), args.pack_name, max(5, args.chunk_size), args.max_words, args.level_default, max(0, args.quizzes_per_module), args.seed)


if __name__ == "__main__":
    main()
