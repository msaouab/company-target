import { useState } from 'react'
import '../styles/PaginationControls.css'

type TPaginationControls = {
	totalItems: number
	itemsPerPage: number
	currentPage: number
	setCurrentPage: (pageNumber: number) => void
	setItemsPerPage: (itemsPerPage: number) => void
}

const PaginationControls = ({
	totalItems,
	itemsPerPage,
	currentPage,
	setCurrentPage,
	setItemsPerPage,
}: TPaginationControls) => {
	const totalPages = Math.ceil(totalItems / itemsPerPage)
	const maxPagesToShow = 10 // Maximum number of page numbers to display
	const [startPage, setStartPage] = useState(1) // Start page number

	const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber)
		// Update the start page if clicking near the end of the current range
		if (pageNumber >= startPage + maxPagesToShow - 2) {
			setStartPage(pageNumber - maxPagesToShow + 3)
		} else if (pageNumber <= startPage + 1) {
			setStartPage(1)
		}
	}

	const handleItemsPerPageChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setItemsPerPage(parseInt(event.target.value))
		setStartPage(1) // Reset the start page when changing items per page
	}

	const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages) // Calculate the end page number

	return (
		<div className="pagination">
			<button
				className="pagination-button"
				onClick={() => handlePageChange(currentPage - 1)}
				disabled={currentPage === 1}
			>
				Previous
			</button>
			{startPage > 1 && (
				<button
					className="pagination-button"
					onClick={() => handlePageChange(1)}
				>
					1
				</button>
			)}
			{startPage > 2 && <span className="pagination-ellipsis">...</span>}
			{Array.from(
				{ length: endPage - startPage + 1 },
				(_, i) => startPage + i
			).map((pageNumber) => (
				<button
					key={pageNumber}
					className={`pagination-button ${pageNumber === currentPage ? 'active' : ''}`}
					onClick={() => handlePageChange(pageNumber)}
				>
					{pageNumber}
				</button>
			))}
			{endPage < totalPages && (
				<span className="pagination-ellipsis">...</span>
			)}
			{endPage < totalPages && (
				<button
					className="pagination-button"
					onClick={() => handlePageChange(totalPages)}
				>
					{totalPages}
				</button>
			)}
			<button
				className="pagination-button"
				onClick={() => handlePageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
			>
				Next
			</button>
			<select
				className="pagination-select"
				value={itemsPerPage}
				onChange={handleItemsPerPageChange}
			>
				<option value="10">10</option>
				<option value="20">20</option>
				<option value="30">30</option>
				<option value="40">40</option>
				<option value="50">50</option>
			</select>
		</div>
	)
}
export default PaginationControls
