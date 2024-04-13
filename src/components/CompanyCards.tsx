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
			<p>{company.address}</p>
			<p>{company.city}</p>
			<p>{company.phone}</p>
			<p>{company.fax}</p>
			<p>{company.status}</p>
			<p>{company.capital}</p>
			<p>{company.latitude}</p>
			<p>{company.longitude}</p>
			<p>{company.activity}</p>
		</div>
	)
}

export default CompanyCards
