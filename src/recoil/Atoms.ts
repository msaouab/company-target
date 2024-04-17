import { RecoilState, atom } from 'recoil'

export const SearchValueState: RecoilState<string[] | null> = atom<
	string[] | null
>({
	key: 'searchState',
	default: [],
})

export const FilterState: RecoilState<string[] | null> = atom<string[] | null>({
	key: 'filterState',
	default: [],
})
