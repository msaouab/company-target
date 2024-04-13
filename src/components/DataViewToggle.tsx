import { useRecoilValue } from 'recoil'
import '../styles/DataViewToggle.css'
import CompanyCards from './CompanyCards'
import { FilterState, SearchValueState } from '../recoil/Atoms'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { TCompany } from '../_types/company'
import PaginationControls from './PaginationControls'
import { useSearchParams } from 'react-router-dom'

const DataViewToggle = () => {
	const searchValue = useRecoilValue(SearchValueState)
	const filter = useRecoilValue(FilterState)
	const [data, setData] = useState<TCompany[]>([])
	const [currentPage, setCurrentPage] = useState(1)
	const [itemsPerPage, setItemsPerPage] = useState(10)
	const [, setSearchParams] = useSearchParams()

	const jsonPath = import.meta.env.VITE_API_URL

	const filterData = (
		data: TCompany[],
		filter: string[],
		searchValue: string
	): TCompany[] => {
		let result:TCompany[] = []

		if (filter.includes('all')) {
			result = data.filter(
				(company) =>
					company.name
						.toLowerCase()
						.includes(searchValue.toLowerCase()) ||
					company.city
						.toLowerCase()
						.includes(searchValue.toLowerCase()) ||
					company.activity
						.toLowerCase()
						.includes(searchValue.toLowerCase())
			)
		} else {
			const filterConditions: ((company: TCompany) => boolean)[] = []

			if (filter.includes('city')) {
				filterConditions.push((company: TCompany) =>
					company.city
						.toLowerCase()
						.includes(searchValue.toLowerCase())
				)
			}

			if (filter.includes('company')) {
				filterConditions.push((company: TCompany) =>
					company.name
						.toLowerCase()
						.includes(searchValue.toLowerCase())
				)
			}

			if (filter.includes('activity')) {
				filterConditions.push((company: TCompany) =>
					company.activity
						.toLowerCase()
						.includes(searchValue.toLowerCase())
				)
			}

			if (filterConditions.length > 0) {
				result = data.filter((company) =>
					filterConditions.some((condition) => condition(company))
				)
			}
		}

		return result
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`${jsonPath}?_page=${currentPage}&_limit=${itemsPerPage}`
				)
				setData(response.data)
			} catch (error) {
				console.error('Error getting data:', error)
			}
		}

		fetchData()
	}, [jsonPath, currentPage, itemsPerPage])

	useEffect(() => {
		setSearchParams({ filter: filter.join(','), query: searchValue })
		if (filter.includes('all') || filter.length === 0) {
			setSearchParams({ query: searchValue })
		}
	}, [filter, searchValue])

	const filteredData = filterData(data, filter, searchValue)
	const paginatedData = filteredData.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	)

	return (
		<section className="grid-toggle">
			{filteredData.length > 0 ? (
				<h2>Companies: {filteredData.length}</h2>
			) : (
				<h2>No companies found</h2>
			)}
			<article className="company-container">
				{paginatedData.map((company, index) => (
					<CompanyCards key={index} company={company} />
				))}
			</article>
			<PaginationControls
				totalItems={filteredData.length}
				itemsPerPage={itemsPerPage}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				setItemsPerPage={setItemsPerPage}
			/>
		</section>
	)
}

export default DataViewToggle
