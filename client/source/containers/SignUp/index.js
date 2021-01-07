import React                     from 'react';
import { connect }               from 'react-redux';
import { bindActionCreators }    from 'redux';
import { signUp }                from 'actions/auth';
import styles                    from './styles.css';

// https://github.com/mjrussell/redux-auth-wrapper/blob/master/examples/localStorage/components/Login.js
// https://github.com/auth0-blog/redux-auth/blob/master/components/Login.js
// https://www.sitepoint.com/introduction-to-using-jwt-in-rails/
// http://stackoverflow.com/questions/35381276/redux-async-requests-with-fetch-api

class SignUp extends React.Component {
  componentWillMount () {
    let { auth } = this.props;

    if (auth.user) {
      this.props.router.push('/');
    }
  }

  onSignUpClick (creds) {
    this.props.signUp(creds).then(()=> {
      this.props.router.push('/');
    });
  }

  handleClick (event) {
    const email = this.refs.email;
    const password = this.refs.password;
    const password_confirmation = this.refs.password_confirmation;
    const creds = { email: email.value.trim(), password: password.value.trim(), password_confirmation: password_confirmation.value.trim() };
    this.onSignUpClick(creds);
  }

  render () {

    return (
      <div className={styles['email-wrapper']}>
        

        <input type='text' ref='email' placeholder='Email' />
        <input type='password' ref='password' placeholder='Password' />
        <input type='password_confirmation' ref='password_confirmation' placeholder='Confirm Password' />
        <button onClick={(event) => this.handleClick(event)} className="btn btn-primary">
          {'Sign up'}
        </button>
        <br/>
        <a href="/login">Login</a>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    auth: state.auth
  };
}

function mapDispatchToProps (dispatch) {
  return {
    signUp: bindActionCreators(signUp, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
