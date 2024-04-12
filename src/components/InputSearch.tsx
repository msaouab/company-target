import { useRecoilState } from 'recoil'
import '../styles/InputSearch.css'
import { SearchValueState } from '../recoil/Atoms'
import FilterBar from './FilterBar'

const InputSearch = () => {
	const [searchValue, setSearchValue] = useRecoilState(SearchValueState)
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.value)
		setSearchValue(e.target.value)
	}
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log('Form submitted')
	}
	return (
		<header className="header debug">
			<h1 className="appTitle">Search For your Companies Target</h1>
			<FilterBar />
			<form onSubmit={handleSubmit} className="formInput">
				<input
					type="search"
					name="search"
					value={searchValue}
					id="search"
					onChange={handleChange}
					placeholder="Find your Compnaies Target"
					autoComplete="off"
					className="searchInput"
				/>
			</form>
		</header>
	)
}

export default InputSearch
