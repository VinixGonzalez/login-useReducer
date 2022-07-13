import { useReducer } from "react";
import { login } from "../../utils";
import { FormAction, FormState } from "./models";
import classes from "./styles.module.css";

const INITIAL_STATE: FormState = {
  password: "",
  username: "",
  error: false,
  loading: false,
  isLoggedIn: false,
};

const formReducer = (state: FormState, action: FormAction) => {
  switch (action.type) {
    case "changeField": {
      return {
        ...state,
        [action.field as string]: action.value,
      };
    }
    case "login": {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }
    case "logout": {
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        username: "",
        password: "",
      };
    }
    case "success": {
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        error: false,
      };
    }
    case "error": {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }

    default:
      break;
  }

  return state;
};

export function Login() {
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { password, username } = state;

    dispatch({ type: "login" });

    await login({ password, username })
      .then((res) => {
        if (res) {
          dispatch({ type: "success" });
        }
      })
      .catch(() => {
        dispatch({ type: "error" });
      });
  };

  return (
    <div className={classes.container}>
      {state.isLoggedIn ? (
        <div className={classes.welcomeContainer}>
          <h1>Welcome {state.username}!</h1>
          <button
            className={classes.button}
            onClick={() => dispatch({ type: "logout" })}
          >
            Logout
          </button>
        </div>
      ) : (
        <>
          <h1 className={classes.title}>Login</h1>

          {state.error && (
            <div className={classes.errorContainer}>
              <span>Username ou password inválido!</span>
            </div>
          )}

          <form onSubmit={(e) => handleLogin(e)} className={classes.loginForm}>
            <div>
              <label htmlFor="username">Username</label>
              <input
                className={classes.input}
                value={state.username}
                id="username"
                type="text"
                onChange={(e) =>
                  dispatch({
                    type: "changeField",
                    field: "username",
                    value: e.currentTarget.value,
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                className={classes.input}
                value={state.password}
                id="password"
                type="password"
                onChange={(e) =>
                  dispatch({
                    type: "changeField",
                    field: "password",
                    value: e.currentTarget.value,
                  })
                }
              />
            </div>

            <button disabled={state.loading} className={classes.button}>
              {state.loading ? "Loading..." : "Login"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
