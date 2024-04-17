import { useRecoilValue } from 'recoil'
import '../styles/DataViewToggle.css'
import CompanyCards from './CompanyCards'
import { FilterState, SearchValueState } from '../recoil/Atoms'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { TCompany } from '../_types/company'
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator'
import { Skeleton } from 'primereact/skeleton'
import { useSearchParams } from 'react-router-dom'
import noData from '../assets/no-data-Photoroom.png-Photoroom.png'

const DataViewToggle = () => {
	const searchValue = useRecoilValue(SearchValueState)
	const filter = useRecoilValue(FilterState)
	const [data, setData] = useState<TCompany[]>([])
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [itemsPerPage, setItemsPerPage] = useState<number>(10)
	const [first, setFirst] = useState<number>(0)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [searchParams, setSearchParams] = useSearchParams()
	const jsonPath = '/companies.json'

	const filterData = (
		data: TCompany[],
		filter: string[],
		searchValue: string[]
	): TCompany[] => {
		let result: TCompany[] = []

		if (filter?.includes('all') || filter.length === 0) {
			result = data.filter((company) => {
				const companyValues = Object.values(company)
				const companyValuesString = companyValues
					.map((value) => value.toString().toLowerCase())
					.join(' ')
				return searchValue.every((value) =>
					companyValuesString.includes(value.toLowerCase())
				)
			})
		} else {
			const filterConditions: ((company: TCompany) => boolean)[] = []

			if (filter?.includes('city')) {
				filterConditions.push((company: TCompany) =>
					searchValue.some((city) =>
						company.city.toLowerCase().includes(city.toLowerCase())
					)
				)
			}

			if (filter?.includes('company')) {
				filterConditions.push(
					(company: TCompany) =>
						searchValue.some((name) =>
							company.name
								.toLowerCase()
								.includes(name.toLowerCase())
						)
				)
			}

			if (filter?.includes('activity')) {
				filterConditions.push(
					(company: TCompany) =>
						searchValue.some((activity) =>
							company.activity
								.toLowerCase()
								.includes(activity.toLowerCase())
						)
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

	const handleQueryParamChange = () => {
		const pageFromQueryParam = searchParams.get('page')
		if (pageFromQueryParam) {
			setCurrentPage(parseInt(pageFromQueryParam))
		} else {
			setCurrentPage(1)
		}
	}

	useEffect(() => {
		handleQueryParamChange()
		const itemPerPageFromQueryParam = searchParams.get('ItemPerPage')
		if (itemPerPageFromQueryParam) {
			setItemsPerPage(parseInt(itemPerPageFromQueryParam))
		} else {
			setItemsPerPage(10)
		}
	}, [searchParams, itemsPerPage])

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

	const filteredData = filterData(data, filter || [], searchValue || [])
	const paginatedData = filteredData.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	)

	const onPageChange = (event: PaginatorPageChangeEvent) => {
		setFirst(event.first)
		setItemsPerPage(event.rows)
		setCurrentPage(event.page + 1)

		searchParams.set('page', (event.page + 1).toString())
		setSearchParams(searchParams)
		searchParams.set('ItemPerPage', event.rows.toString())
		setSearchParams(searchParams)
	}

	return (
		<section className="grid-toggle">
			<h2 className="company-length">
				{filteredData.length > 0 ? (
					`Companies: ${filteredData.length}`
				) : (
					<>
						No companies found
						<img
							src={noData}
							alt="no data"
							className="no-data-img"
						/>
					</>
				)}
			</h2>

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
