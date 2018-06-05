<template>
  <div class="fixed fixed-center bg-grey-1 text-white">
   <form v-on:submit.prevent="onSubmit()">
      <q-card square  class="flex-center text-center" style="width: 400px; padding:50px">
        <img src="/statics/quasar-logo.png" style='max-width:300px; padding-top:30px; padding-bottom:50px'>
        <q-card-separator />
        <div class="text-left" >
          <q-field
            icon="mail"
            :error="$v.form.email.$error"
            error-label="Forneça um e-mail válido" /> 
            <q-input 
              id="email" 
              type="email" 
              v-model.trim="form.email" 
              float-label="E-mail"v-model="frm.email"
              @blur="$v.form.email.$touch" />
          </q-field>

          <q-field
            icon="lock"
            :error="$v.form.password.$error"
            error-label="Obrigatório" />
            <q-input
              id="password"
              float-label="Senha"
              type="password"
              v-model="form.password"
              @blur="$v.form.password.$touch"
              @keyup.enter="submit" />
          </q-field>
        </div>
        <q-card-actions>
          <q-btn type="submit" class="fit" color="primary">Login</q-btn>
        </q-card-actions>
      </q-card>
    </form>
  </div>
</template>

<style>
</style>

<script>
  import { required, email } from 'vuelidate/lib/validators'

  export default {
    data () {
      return {
        drawerState: true,
        rememberMe: true,
        form: {
          email: '',
          password: ''
        }
      }
    },
    validations: {
      form: {
        email: {
          required,
          email
        },
        password: {
          required
        }
      }
    },
    methods: {
      onSubmit () {
        this.$auth.login({
          fetchUser: false,
          data: this.form,
          rememberMe: this.rememberMe
        })
          .then(response => {
          }, (res) => {
            console.log('Res: ', res)
          })
      }
    }
  }
</script>
