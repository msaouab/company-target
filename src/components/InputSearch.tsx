import { useRecoilState } from 'recoil'
import '../styles/InputSearch.css'
import { FilterState, SearchValueState } from '../recoil/Atoms'
import FilterBar from './FilterBar'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'

const InputSearch = () => {
	const [searchValue, setSearchValue] = useRecoilState(SearchValueState)
	const [filter] = useRecoilState(FilterState)
	const [searchParams, setSearchParams] = useSearchParams()

	useEffect(() => {
		if (searchParams.has('search')) {
			setSearchValue(searchParams.get('search') || '')
		}
	}, [searchParams])

	useEffect(() => {
		if (searchValue.length === 0) searchParams.delete('search')
		else searchParams.set('search', searchValue)
		if (filter.length > 0) {
			searchParams.set('filter', filter.join(','))
		} else {
			searchParams.delete('filter')
		}
		setSearchParams(searchParams)
	}, [searchValue, filter])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value)
	}
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
	}

	return (
		<section className="header">
			<h1 className="appTitle">Search For your Companies Target</h1>
			<FilterBar />
			<form onSubmit={handleSubmit} className="formInput">
				<input
					type="search"
					name="search"
					value={searchValue}
					id="search"
					onChange={handleChange}
					placeholder="Find your Compnaies Target"
					autoComplete="off"
					className="searchInput"
				/>
			</form>
		</section>
	)
}

export default InputSearch
