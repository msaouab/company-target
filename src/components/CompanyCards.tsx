import { TCompany } from '../_types/company'
import '../styles/CompanyCards.css'

type TCompanyCards = {
	company: TCompany
	key: number
}

const CompanyCards = ({ company }: TCompanyCards) => {
	const openGoogleMaps = (lat: number | string, lng: number | string) => {
		window.open(
			`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
		)
	}

	return (
		<div className="company-list">
			<h2>{company.name}</h2>
			<p>
				<a
					href="#"
					onClick={() =>
						openGoogleMaps(company.latitude, company.longitude)
					}
				>
					<strong>Address:</strong> {company.address}
				</a>
			</p>
			<p>
				<strong>City:</strong> {company.city}
			</p>
			<p>
				<strong>Phone:</strong> {company.phone}
			</p>
			<p>
				<strong>Fax:</strong> {company.fax}
			</p>
			<p>
				<strong>Status:</strong> {company.status}
			</p>
			<p>
				<strong>Capital:</strong> {company.capital}
			</p>
			{/* <p>
				<strong>Latitude:</strong> {company.latitude}
			</p>
			<p>
				<strong>Longitude:</strong> {company.longitude}
			</p> */}
			<p>
				<strong>Activity:</strong> {company.activity}
			</p>
		</div>
	)
}

export default CompanyCards
