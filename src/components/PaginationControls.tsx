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

	const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber)
	}

	const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setItemsPerPage(parseInt(event.target.value))
	}

	return (
		<div>
			<button
				onClick={() => handlePageChange(currentPage - 1)}
				disabled={currentPage === 1}
			>
				Previous
			</button>
			{Array.from({ length: totalPages }, (_, i) => (
				<button
					key={i + 1}
					onClick={() => handlePageChange(i + 1)}
					disabled={i + 1 === currentPage}
				>
					{i + 1}
				</button>
			))}
			<button
				onClick={() => handlePageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
			>
				Next
			</button>
			<select
				value={itemsPerPage}
				onChange={handleItemsPerPageChange}
				style={{ marginLeft: '10px' }}
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
