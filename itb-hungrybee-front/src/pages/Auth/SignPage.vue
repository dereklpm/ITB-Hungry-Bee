<template>
  <form class="signUp" @submit.prevent>
    <h1 class="signUp__name">Sign Up</h1>

    <BaseAlert v-if="!!serverError" class="signUp__alert" variant="danger" :message="serverError" />

    <BaseAlert v-if="!!serverSuccess" class="signUp__alert" variant="success" :message="serverSuccess" />

    <div class="signUp__userInfo">
      <BaseInput label="First Name" :value="formData.firstName" :error="errors.firstName"
        @onInput="(value) => changeField('firstName', value)" />
      <BaseInput label="Last Name" :value="formData.lastName" :error="errors.lastName"
        @onInput="(value) => changeField('lastName', value)" />
    </div>
    <BaseInput label="Email" :value="formData.email" :error="errors.email"
      @onInput="(value) => changeField('email', value)" />
    <BaseInput label="Phone number" :value="formData.phoneNumber" :error="errors.phoneNumber"
      @onInput="(value) => changeField('phoneNumber', value)" />
    <BaseInput class="signUp__baseInput" label="Password" :value="formData.password" type="password"
      :showPassword="showPassword" :error="errors.password" @onPasswordToggle="showPasswordClick"
      @onInput="(value) => changeField('password', value)" />

    <BaseButton variant="primary" class="signUp__baseBtn" @onClick="register" :loading="isLoading">
      Register
    </BaseButton>
    <p class="signUp__text">
      Do you want to out ?
      <router-link to="/auth/login" class="signUp__link"> Login </router-link>
    </p>
  </form>
</template>

<script>
import client from "../../api";
import { mapActions } from 'vuex';

export default {
  name: "SignPage",
  data() {
    return {
      isLoading: false,
      showPassword: false,
      serverError: "",
      serverSuccess: "",
      formData: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
      },
      errors: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
      },
    };
  },

  methods: {
    ...mapActions({
      signUp: 'auth/signUp'
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
    register() {
      this.isLoading = true;

      this.signUp(this.formData)
        .then((response) => {
          this.serverError = "";
          this.serverSuccess = response.data.message;

          this.formData.firstName = "";
          this.formData.lastName = "";
          this.formData.email = "";
          this.formData.phoneNumber = "";
          this.formData.password = "";

          if (response.data.status == "fail") {
            const serverError = response.data.data;

            this.serverError = serverError;
          }
          else {
            // localStorage.setItem("hungrybeeToken", response.data.data.token);
            this.$router.push("/auth/signUp");
            this.$router.push("/auth/login");
          }

        })
        .catch((error) => {
          const serverError = error.response.data;

          this.alertMessage = serverError.message;

          if (serverError.errors.firstName) {
            this.errors.firstName = serverError.errors.firstName;
          }

          if (serverError.errors.lastName) {
            this.errors.lastName = serverError.errors.lastName;
          }

          if (serverError.errors.email) {
            this.errors.email = serverError.errors.email;
          }

          if (serverError.errors.phoneNumber) {
            this.errors.phoneNumber = serverError.errors.phoneNumber;
          }

          if (serverError.errors.password) {
            this.errors.password = serverError.errors.password;
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<style lang="scss">
.signUp {
  width: 50%;
  margin: 0 auto;

  &__alert {
    margin-bottom: 16px;
  }

  &__name {
    color: $color-dark;
    font-size: 32px;
    font-family: $base-font;
    margin-bottom: 40px;
    font-weight: 700;
    letter-spacing: 0.1px;
  }

  &__userInfo {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0 10px;
  }

  &__baseInput {
    margin-bottom: 28px !important;
  }

  &__baseBtn {
    width: 100%;
    margin-bottom: 35px;
  }

  &__text {
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
  .signUp {
    width: 95%;
  }
}
</style>
