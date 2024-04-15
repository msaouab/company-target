import { useRecoilValue } from 'recoil'
import '../styles/DataViewToggle.css'
import CompanyCards from './CompanyCards'
import { FilterState, SearchValueState } from '../recoil/Atoms'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { TCompany } from '../_types/company'
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator'
import { Skeleton } from 'primereact/skeleton'

const DataViewToggle = () => {
	const searchValue = useRecoilValue(SearchValueState)
	const filter = useRecoilValue(FilterState)
	const [data, setData] = useState<TCompany[]>([])
	const [currentPage, setCurrentPage] = useState(1)
	const [itemsPerPage, setItemsPerPage] = useState(10)
	const [first, setFirst] = useState<number>(0)
	const [isLoading, setIsLoading] = useState(true)
	const jsonPath = '/companies.json'

	const filterData = (
		data: TCompany[],
		filter: string[],
		searchValue: string
	): TCompany[] => {
		let result: TCompany[] = []

		if (filter?.includes('all') || filter.length === 0) {
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

			if (filter?.includes('city')) {
				filterConditions.push((company: TCompany) =>
					company.city
						.toLowerCase()
						.includes(searchValue.toLowerCase())
				)
			}

			if (filter?.includes('company')) {
				filterConditions.push((company: TCompany) =>
					company.name
						.toLowerCase()
						.includes(searchValue.toLowerCase())
				)
			}

			if (filter?.includes('activity')) {
				filterConditions.push((company: TCompany) =>
					company.activity
						.toLowerCase()
						.includes(searchValue.toLowerCase())
				)
			}

			if (filterConditions?.length > 0) {
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
				if (response.status === 200) {
					setData(response.data)
					setIsLoading(false)
				}
			} catch (error) {
				console.error('Error getting data:', error)
			}
		}

		fetchData()
	}, [jsonPath, currentPage, itemsPerPage])

	const filteredData = filterData(data, filter, searchValue)
	const paginatedData = filteredData.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	)

	const onPageChange = (event: PaginatorPageChangeEvent) => {
		setCurrentPage(event.page + 1)
		setFirst(event.first)
		setItemsPerPage(event.rows)
	}

	return (
		<section className="grid-toggle">
			{filteredData.length > 0 ? (
				<h2 className="company-length">
					Companies: {filteredData.length}
				</h2>
			) : (
				<h2>No companies found</h2>
			)}
			<article
				className={`company-container ${isLoading ? 'loader' : ''}`}
			>
				{isLoading ? (
					<>
						<Skeleton
							height="10rem"
							className="mb-2"
							animation="wave"
						></Skeleton>
						<Skeleton
							height="10rem"
							className="mb-2"
							animation="wave"
						></Skeleton>
						<Skeleton
							height="10rem"
							className="mb-2"
							animation="wave"
						></Skeleton>
					</>
				) : (
					paginatedData.map((company, index) => (
						<CompanyCards key={index} company={company} />
					))
				)}
			</article>
			<Paginator
				first={first}
				rows={itemsPerPage}
				totalRecords={filteredData.length}
				rowsPerPageOptions={[10, 20, 30, 50]}
				onPageChange={onPageChange}
			/>
		</section>
	)
}

export default DataViewToggle
