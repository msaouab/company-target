import { useRecoilState } from 'recoil'
import '../styles/FilterBar.css'
import { FilterState } from '../recoil/Atoms'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

const FilterBar = () => {
	const [filter, setFilter] = useRecoilState(FilterState)
	const [searchParams, setSearchParams] = useSearchParams()

	useEffect(() => {
		const savedFilter = localStorage.getItem('filter')
		if (savedFilter) {
			setFilter(JSON.parse(savedFilter))
		}
	}, [setFilter])

	const handleFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
		const buttonValue = e.currentTarget.textContent?.toLowerCase() || 'all'
		if (buttonValue === 'all') {
			setFilter([buttonValue])
		} else if (filter.includes('all')) {
			setFilter([buttonValue])
		} else if (filter.includes(buttonValue)) {
			setFilter(filter.filter((btn) => btn !== buttonValue))
		} else {
			setFilter([...filter, buttonValue])
		}
	}

	useEffect(() => {
		localStorage.setItem('filter', JSON.stringify(filter))
		setSearchParams({ filter: filter.join(',') })
		if (filter.includes('all') || filter.length === 0) {
			setSearchParams({})
		}
	}, [filter])

	return (
		<div className="filter-bar">
			<button
				onClick={handleFilter}
				className={`filter-btn ${filter.includes('all') ? 'active-btn' : ''}`}
			>
				All
			</button>
			<button
				onClick={handleFilter}
				className={`filter-btn ${filter.includes('city') ? 'active-btn' : ''}`}
			>
				City
			</button>
			<button
				onClick={handleFilter}
				className={`filter-btn ${filter.includes('company') ? 'active-btn' : ''}`}
			>
				Company
			</button>
			<button
				onClick={handleFilter}
				className={`filter-btn ${filter.includes('activity') ? 'active-btn' : ''}`}
			>
				Activity
			</button>
		</div>
	)
}

export default FilterBar
