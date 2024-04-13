const PaginationControls = ({
	totalItems,
	itemsPerPage,
	currentPage,
	setCurrentPage,
}) => {
	const totalPages = Math.ceil(totalItems / itemsPerPage)

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber)
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
		</div>
	)
}

export default PaginationControls
