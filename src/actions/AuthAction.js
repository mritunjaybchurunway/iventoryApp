export const loginUser = ({ email, password }) => {
      fetch(`${MAIN_LINK}token`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user: {
              email,
              password,
            }
          })
        })
        .then(user => {
          if (user.status === 401) {
            dispatch({
              type: LOGIN_USER_FAILED
            });
          } else {
            user.json().then((data) => {
              saveItem('authentication_token', data.authentication_token);
              saveItem('email', data.username);
              const obj = {};
              obj.username = data.username;
              obj.authentication_token = data.authentication_token;
              dispatch({
                type: LOGIN_USER_SUCCESSFUL,
                payload: obj
              });
              NavigatorService.reset('main');
            });
          }
        }).catch((error) => {
          console.log(error);
          dispatch({
            type: LOGIN_USER_FAILED
          });
        });
  };