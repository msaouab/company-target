import { useRecoilState } from 'recoil'
import '../styles/FilterBar.css'
import { FilterState } from '../recoil/Atoms'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

const FilterBar = () => {
	const [filter, setFilter] = useRecoilState(FilterState)
	const [searchParams, setSearchParams] = useSearchParams()

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
		if (searchParams.has('filter')) {
			setFilter((searchParams?.get('filter') || '').split(','))
		}
	}, [searchParams])

	useEffect(() => {
		if (filter.includes('all')) {
			setSearchParams('')
		} else {
			setSearchParams('filter=' + filter.join(','))
		}
	}, [filter])

	return (
		<div className="filter-bar">
			<label className="checkbox-label">
				<input
					type="checkbox"
					value="all"
					checked={filter.includes('all')}
					onChange={handleCheckboxChange}
				/>
				All
			</label>
			<label className="checkbox-label">
				<input
					type="checkbox"
					value="city"
					checked={filter.includes('city')}
					onChange={handleCheckboxChange}
				/>
				City
			</label>
			<label className="checkbox-label">
				<input
					type="checkbox"
					value="company"
					checked={filter.includes('company')}
					onChange={handleCheckboxChange}
				/>
				Company
			</label>
			<label className="checkbox-label">
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
