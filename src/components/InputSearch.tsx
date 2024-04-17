import { useRecoilState } from 'recoil'
import '../styles/InputSearch.css'
import { SearchValueState } from '../recoil/Atoms'
import FilterBar from './FilterBar'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { Chips, ChipsChangeEvent } from 'primereact/chips'

const InputSearch = () => {
	const [searchValue, setSearchValue] = useRecoilState(SearchValueState)
	const [searchParams, setSearchParams] = useSearchParams()

	useEffect(() => {
		if (searchParams.has('search')) {
			setSearchValue((searchParams?.get('search') || '').split(','))
		}
	}, [searchParams])

	useEffect(() => {
		if (searchValue?.length === 0) {
			searchParams.delete('search')
		} else {
			searchParams.set('search', searchValue?.join(',') || '')
		}
		setSearchParams(searchParams)
	}, [searchValue, searchParams])

	const handleChange = (e: ChipsChangeEvent) => {
		setSearchValue(e.value as string[])
	}

	return (
		<section className="header">
			<h1 className="appTitle">Search For your Companies Target</h1>
			<FilterBar />
			<div className="p-fluid chips-container">
				<label htmlFor="company" className="placeholder-chips">
					Find your Companies Target
				</label>
				<Chips
					id="company"
					value={searchValue || []}
					onChange={handleChange}
				/>
			</div>
		</section>
	)
}

export default InputSearch
