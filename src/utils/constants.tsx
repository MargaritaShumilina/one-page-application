import {DropdownOption} from "./types";

export const dropdownOptions: DropdownOption[] = [
    { label: 'Да', value: true },
    { label: 'Нет', value: false },
];

export const tHeadProperties:string[] = ['Название', 'Значение по умолчанию', 'Единица измерения']

export const properties:Record<string, string>[] = [
    {
        name: 'Давление номинальное',
        defaultValue: '2,5',
        unit: 'МПа'
    },
    {
        name: 'Пожаробезопасный',
        defaultValue: 'checkbox',
        unit: ''
    },
    {
        name: 'Температура среды',
        defaultValue: '',
        unit: '°С'
    },
    {
        name: 'Функциональный признак прибора',
        defaultValue: 'T',
        unit: ''
    },
]

export const connections:string[] = ['Механическое оборудование', 'Титул']

