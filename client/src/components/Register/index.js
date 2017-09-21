import React from 'react'
import './index.css'

class RegisterPanel extends React.Component {
	componentWillMount() {
		// check here login token
	}

	handleSubmit(e) {
		e.preventDefault()
		const username = e.target.name.value.toLowerCase()
		const pass = e.target.pass.value
		this.props.register({username, pass})
		this.props.history.push("/")
	}

	render() {
		return(
			<div className="container">
				<header className="header">
					<h1>Login</h1>
					<p className="sub-title">Login page</p>
				</header>
				<form className="input-event" onSubmit={(e) => this.handleSubmit(e)}>
					<input
						className="input"
						type="text"
						name="name"
						placeholder="Name"
						required="true"
					/> 
					<input
						className="input"
						type="text"
						name="pass"
						placeholder="Password"
						required="true"
					/>        
					<input
						className="button"
						type="submit"
						value="Login"
					/>
					<p className="login-hint">
						* for testing use next data<br />
						username: "user"<br />
						password: "user"
					</p>
				</form>
			</div>
		)
	}
}

export default RegisterPanel