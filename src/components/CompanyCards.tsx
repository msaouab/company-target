import { TCompany } from '../_types/company'
import '../styles/CompanyCards.css'

type TCompanyCards = {
	company: TCompany
	key: number
}

const CompanyCards = ({ company }: TCompanyCards) => {
	return (
		<div className="company-list">
			<h2>{company.name}</h2>
			<p>
				<strong>Address:</strong> {company.address}
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
			<p>
				<strong>Latitude:</strong> {company.latitude}
			</p>
			<p>
				<strong>Longitude:</strong> {company.longitude}
			</p>
			<p>
				<strong>Activity:</strong> {company.activity}
			</p>
		</div>
	)
}

export default CompanyCards
