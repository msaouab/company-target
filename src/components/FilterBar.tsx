import { useRecoilState } from 'recoil'
import '../styles/FilterBar.css'
import { FilterState } from '../recoil/Atoms'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

const FilterBar = () => {
	const [filter, setFilter] = useRecoilState(FilterState)
	const [, setSearchParams] = useSearchParams()

	useEffect(() => {
		const savedFilter = localStorage.getItem('filter')
		if (savedFilter) {
			setFilter(JSON.parse(savedFilter))
		}
	}, [setFilter])

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const checkboxValue = e.target.value
		if (checkboxValue === 'all') {
			setFilter([checkboxValue])
		} else if (filter.includes('all')) {
			setFilter([checkboxValue])
		} else if (filter.includes(checkboxValue)) {
			setFilter(filter.filter((btn) => btn !== checkboxValue))
		} else {
			setFilter([...filter, checkboxValue])
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
		<div className="filter-bar debug">
			<label className='checkbox-label'>
				<input
					type="checkbox"
					value="all"
					checked={filter.includes('all')}
					onChange={handleCheckboxChange}
				/>
				All
			</label>
			<label className='checkbox-label'>
				<input
					type="checkbox"
					value="city"
					checked={filter.includes('city')}
					onChange={handleCheckboxChange}
				/>
				City
			</label>
			<label className='checkbox-label'>
				<input
					type="checkbox"
					value="company"
					checked={filter.includes('company')}
					onChange={handleCheckboxChange}
				/>
				Company
			</label>
			<label className='checkbox-label'>
				<input
					type="checkbox"
					value="activity"
					checked={filter.includes('activity')}
					onChange={handleCheckboxChange}
				/>
				Activity
			</label>
		</div>
	)
}

export default FilterBar
