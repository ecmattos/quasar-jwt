<template>
  <div class="fixed fixed-center bg-grey-1 text-white">
    <q-card square class="flex-center text-center" style="width: 400px; padding:25px">
      <!-- Notice the slot="overlay" -->
      <q-card-title>
        <p class="text-primary">Esqueci a senha</p>
        <q-card-media>
          <img src="/assets/img/user_default.png" style="width: 400px; padding:25px">
        </q-card-media>
      </q-card-title>          
        
      <q-card-main />
        <div class="text-left">
          <q-field
            icon="mail"
            :error-label="errorMsgEmail"
          >
            <q-input
              float-label="E-mail"
              v-model.trim="form.email"
              autofocus="true"
              :error="$v.form.email.$error"
              @blur="$v.form.email.$touch"
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
        <q-btn flat color="primary" label="Criar Conta" class="text-right" @click="$router.replace('/form')"></q-btn>
        <q-btn flat color="primary" label="Esqueci a senha"></q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<style>
</style>

<script>
  import { required, email } from 'vuelidate/lib/validators'

  export default {
    data () {
      return {
        form: {
          email: ''
        },
        loading: false,
        percentage: 0,
        submitStatus: null
      }
    },
    validations: {
      form: {
        email: {
          required,
          email
        }
      }
    },
    computed: {
      errorMsgEmail() {
        if (!this.$v.form.email.required) return 'Obrigatório.'
        if (!this.$v.form.email.email) return `Inválido.`
      }
    },
    methods: {
      onSubmit() {
        this.$v.form.$touch()
        if (this.$v.form.$error) {
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