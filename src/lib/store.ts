import { writable } from 'svelte/store';

export const scl = writable();

export const AnsNote = writable();

export const GuitarScale = writable(['E','F','F#','G','G#','A','A#','B','C','C#','D','D#','E','F','F#','G','G#','A','A#','B','B','C','C#','D','D#','E','F','F#','G','G#'])

// C C# D D# E F F# G G# A A# B
// T T S T T T S

export const scaledic = writable({
    'C':['C', 'D', 'E', 'F', 'G', 'A', 'B', 'Ċ'],
    'C#':['C#', 'D#', 'F', 'F#', 'G#', 'A#', 'C', 'Ċ#'],
    'D':['D', 'E', 'F#', 'G', 'A', 'B', 'C#', 'Ḋ'],
    'D#':['D#', 'F', 'G', 'G#', 'A#', 'C', 'D', 'Ḋ#'],
    'E':['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#', 'Ė'],
    'F':['F', 'G', 'A', 'A#', 'C', 'D', 'E', 'Ḟ'],
    'F#':['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'F', 'Ḟ#'],
    'G':['G', 'A', 'B', 'C', 'D', 'E', 'F#', 'Ġ'],
    'G#':['G#', 'A#', 'C', 'C#', 'D#', 'F', 'G', 'Ġ#'],
    'A':['A', 'B', 'C#', 'D', 'E', 'F#', 'G#', 'Ȧ'],
    'A#':['A#', 'C', 'D', 'D#', 'F', 'G', 'A', 'Ȧ#'],
    'B':['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#', 'Ḃ']
})