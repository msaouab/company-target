import { atom } from 'recoil'

export const SearchValueState = atom({
	key: 'inputSearchState',
	default: '',
})

export const FilterState = atom({
	key: 'filterState',
	default: ['all'],
})
