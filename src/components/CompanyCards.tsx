import { useState } from 'react'
import { TCompany } from '../_types/company'
import '../styles/CompanyCards.css'
import { FaCopy } from 'react-icons/fa'

type TCompanyCards = {
	company: TCompany
	key: number
}

const CompanyCards = ({ company }: TCompanyCards) => {
	const [isCopied, setIsCopied] = useState(false)
	const openGoogleMaps = (lat: number | string, lng: number | string) => {
		window.open(
			`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
		)
	}

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text)
		setIsCopied(true)
		setTimeout(() => {
			setIsCopied(false)
		}, 2000)
	}

	return (
		<div className="company-list">
			<h2>{company.name}</h2>
			<p className="address ">
				<a
					href="#"
					onClick={() =>
						openGoogleMaps(company.latitude, company.longitude)
					}
				>
					<strong>Address:</strong>{' '}
					{company.address ? company.address : 'N/A'}
				</a>
				<button
					className="copy-btn"
					onClick={() => copyToClipboard(company.address)}
				>
					<FaCopy />
				</button>
				{isCopied && <span className='copy-text'>Copied!</span>}
			</p>
			<p>
				<strong>City:</strong> {company.city ? company.city : 'N/A'}
			</p>
			<p>
				<strong>Phone:</strong> {company.phone ? company.phone : 'N/A'}
			</p>
			<p>
				<strong>Fax:</strong>{' '}
				{company.fax.length > 0 ? company.fax : 'N/A'}
			</p>
			<p>
				<strong>Status:</strong>{' '}
				{company.status ? company.status : 'N/A'}
			</p>
			<p>
				<strong>Capital:</strong>{' '}
				{company.capital ? company.capital : 'N/A'}
			</p>
			{/* <p>
				<strong>Latitude:</strong> {company.latitude}
			</p>
			<p>
				<strong>Longitude:</strong> {company.longitude}
			</p> */}
			<p>
				<strong>Activity:</strong>{' '}
				{company.activity ? company.activity : 'N/A'}
			</p>
		</div>
	)
}

export default CompanyCards
