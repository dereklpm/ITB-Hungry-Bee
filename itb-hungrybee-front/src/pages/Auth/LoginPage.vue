<template>
  <div class="login">
    <h1 class="login__name">Login</h1>
    <p class="login__text">
      Sign in with your data that you entered during your registration.
    </p>

    <BaseAlert v-if="!!serverError" class="login__alert" variant="danger" :message="serverError" />

    <!-- <BaseAlert
      v-if="!!serverSuccess"
      class="login__alert"
      variant="success"
      :message="serverSuccess"
    /> -->
    <!-- ========Base inputs========= -->
    <BaseInput label="Email" type="email" :value="formData.email" :error="errors.email"
      @onInput="(value) => changeField('email', value)" />

    <BaseInput class="login__baseInput" label="Password" type="password" :value="formData.password"
      :showPassword="showPassword" :error="errors.password" @onPasswordToggle="showPasswordClick"
      @onInput="(value) => changeField('password', value)" />

    <!-- ===========Base button========== -->
    <BaseButton variant="primary" class="login__baseBtn" @onClick="login" :loading="isLoading">
      Login
    </BaseButton>

    <router-link to="/auth/forgot-password" class="login__forgotLink">Forgot password</router-link>

    <div class="login__subText">
      <p>
        Don`t have an account?<router-link to="/auth/sign" class="login__link">
          Sign up</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';

export default {
  name: "LoginPage",
  data() {
    return {
      isLoading: false,
      showPassword: false,
      serverError: "",
      serverSuccess: "",
      formData: {
        email: "",
        password: "",
      },
      errors: {
        email: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      userData: 'auth/getUser'
    })
  },
  methods: {
    ...mapActions({
      loginAction: 'auth/login',
      checkAuth: 'auth/checkAuth',
      getUserData: 'auth/getUserData'
    }),
    ...mapMutations({
      setUserData: 'auth/setUserData'
    }),

    showPasswordClick() {
      this.showPassword = !this.showPassword;
    },
    changeField(propertyName, value) {
      if (this.errors[propertyName] !== "") {
        this.errors[propertyName] = "";
      }
      this.formData[propertyName] = value;
    },
    login() {
      this.isLoading = true;


      this.loginAction(this.formData)
        .then((response) => {
          var data = response.data;
          if (data.status == "success") {
            this.serverError = "";
            this.serverSuccess = response.data.data;

            this.formData.email = "";
            this.formData.password = "";
            localStorage.setItem("hungrybeeToken", response.data.data.token);
            this.getUserData(response.data.data.userId)
              .then(response => {
                const { data: { id, firstName, lastName, email, phoneNumber, address, payments } = {} } = response.data;

                console.log("setUserData login", id)
                this.setUserData({
                  id,
                  firstName,
                  lastName,
                  email,
                  phoneNumber,
                  address: address,
                  payments: payments
                })

                console.log("loging success")
                console.log(this.userData)
                this.$router.push("/");
              })
          }
          else {
            this.serverError = data.data;
          this.formData.password = "";
          }
        })
        .catch((error) => {
          this.serverError = error;
          this.formData.password = "";
          // const serverError = error.response.data;

          // this.serverError = serverError.message;

          // if (serverError.errors.email) {
          //   this.errors.email = serverError.errors.email;
          // }

          // if (serverError.errors.password) {
          //   this.errors.password = serverError.errors.password;
          // }
        })
        .finally(() => {
          this.isLoading = false;
        })
    }
  },
};
</script>

<style lang="scss">
/* FORM*/
.login {
  width: 50%;
  margin: 0 auto;
  // position: absolute;
  // top: 50%;
  // left: 50%;
  // transform: translateX(-50%) translateY(-50%);

  &__alert {
    margin-bottom: 16px;
  }

  &__name {
    color: $color-dark;
    font-size: 32px;
    line-height: 82px;
    font-family: $base-font;
    font-weight: 700;
    letter-spacing: 0.1px;
  }

  &__text {
    display: none;
  }

  &__baseInput {
    margin-bottom: 28px !important;
  }

  &__baseCheckbox {
    margin-bottom: 40px;
  }

  &__baseBtn {
    width: 100%;
    margin-bottom: 35px;
  }

  &__forgotLink {
    color: $color-primary;
    display: block;
    font-family: $base-font;
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    margin-bottom: 110px;

    &:hover {
      color: $color-primary;
    }
  }

  &__subText {
    color: $color-dark;
    font-family: $base-font;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
  }

  &__link {
    font-size: 14px;
    color: $color-primary;
  }
}

@media screen and (max-width: 768px) {
  .login {
    transform: translateX(-50%) translateY(-40%);
    width: 95%;

    &__name {
      font-size: 60px;
    }

    &__text {
      display: block;
      color: $color-grey-dark;
      font-family: $base-font;
      font-weight: 400;
      font-size: 14px;
      margin-bottom: 45px;
      line-height: 20px;
      letter-spacing: 0.1px;
    }

    &__link {
      padding-bottom: 32px;
    }
  }
}
</style>
