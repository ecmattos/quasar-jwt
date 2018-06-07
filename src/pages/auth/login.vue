<template>
  <div class="fixed fixed-center bg-grey-1 text-white">
      <q-card square class="flex-center text-center" style="width: 400px; padding:25px">
        <!-- Notice the slot="overlay" -->
        <q-card-title>
          <q-card-media>
            <img src="/assets/img/user_default.png" style="width: 400px; padding:25px">
          </q-card-media>
        </q-card-title>          
        
        <q-card-main />
          <p class="text-primary">Informe suas Credenciais</p>
          <div class="text-left">
            <q-field
              icon="mail"
              :error="$v.email.$error"
              error-label="Forneça um e-mail válido"
            >
              <q-input
                float-label="E-mail"
                v-model="email"
                @blur="$v.email.$touch"
              />
            </q-field>
            
            <br>

            <q-field
              icon="lock"
              :error="$v.password.$error"
              error-label="Obrigatório"
            >
              <q-input
                float-label="Senha"
                type="password"
                v-model="password"
                @blur="$v.password.$touch"
              />
            </q-field>

            <br>

            <q-btn 
              :percentage="percentage"
              :loading="loading"
              class="fit"
              color="primary"
              label="Entrar"
              @click="onSubmit()">

              <span slot="loading">
                <q-spinner-gears class="on-left" />
                Verificando...
              </span>
            </q-btn>
            <br>
          </div>
        </q-card-main>

        <q-card-separator />

        <q-card-actions>
          <q-card-media>
            <img src="/statics/quasar-logo.png" style='max-width:50px; padding-top:10px; padding-bottom:10px'>
          </q-card-media>
          <q-btn flat color="primary" label="Criar Conta" class="text-right" @click="$router.replace('/register')"></q-btn>
          <q-btn flat color="primary" label="Esqueci a senha"></q-btn>
        </q-card-actions>
      </q-card>
    
  </div>
</template>

<style>
</style>

<script>
  import { required, email, minLength } from 'vuelidate/lib/validators'

  export default {
    data () {
      return {
        email: '',
        password: '',
        loading: false,
        percentage: 0,
        submitStatus: null
      }
    },
    validations: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6)
      }
    },
    methods: {
      onSubmit () {
        console.log(this.$v.$touch());
        this.$v.$touch()
        if (this.$v.$error) {
          this.$q.notify({
            message: 'Ops... encontramos alguns problemas !',
            icon: 'warning',
            position: 'top-right'
          })
        } else {
          this.loading = true
          this.percentage = 0

          // we simulate progress here
          this.interval = setInterval(() => {
            // adding a random amount of percentage
            this.percentage += Math.floor(Math.random() * 8 + 10)

            // and when we are done...
            if (this.percentage >= 100) {
              clearInterval(this.interval)
              // DON'T forget to reset loading state:
              this.loading = false
            }
          }, 700)
        }
      },
      beforeDestroy () {
        // we also take care of clearing interval
        // should the user navigate away before the progress has ended
        clearInterval(this.interval)
      }
    }
  }
</script>
