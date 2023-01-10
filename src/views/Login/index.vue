<template>
  <div class="login">
    <div class="login-container">
      <div class="section-1">
        <img src="/img/netease-music.png" />
      </div>
      <div class="title">登录网易云登录</div>
      <div class="section-2">
        <div class="input-box">
          <div class="container">
            <div class="inputs">
              <!-- <input id="countryCode" v-model="countryCode" @blur="inputFocus = ''" /> -->
              <input id="phoneNumber" v-model="formState.phone" @blur="inputFocus = ''" />
            </div>

          </div>
        </div>
        <div class="input-box">
          <div class="container">
            <div class="inputs">
              <input id="password" type="password" v-model="formState.password" @blur="inputFocus = ''"
                @keyup.enter="login" />
            </div>
          </div>
        </div>
        <div class="confirm">
          <button @click="login">
            登录
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
// import { message } from 'ant-design-vue'
export default defineComponent({
  name: '_Login',
  setup: function () {
    const store = useStore()
    const router = useRouter()
    const countryCode = ref('+86')
    const formState = reactive({
      phone: '17705687917',
      password: 'LyMBoy48',
    });
    const login = () => {
      store.dispatch('login', { ...formState })
        .then(() => {
          router.push('/home')
        })
        .catch(() => {
          // message.error(err.message)
        })
    };

    return {
      formState,
      login,
      countryCode
    };
  },
})
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 48px;
  color: var(--color-text);
}

.section-1 {
  margin-bottom: 16px;
  display: flex;
  align-items: center;

  img {
    height: 64px;
    margin: 20px;
    user-select: none;
  }
}

.section-2 {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.input-box {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
  color: var(--color-text);

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 46px;
    background: var(--color-secondary-bg);
    border-radius: 8px;
    width: 300px;
  }

  .svg-icon {
    height: 18px;
    width: 18px;
    color: #aaaaaa;

    margin: {
      left: 12px;
      right: 6px;
    }
  }

  .inputs {
    display: flex;
    width: 85%;
  }

  input {
    font-size: 20px;
    border: none;
    background: transparent;
    width: 100%;
    font-weight: 600;
    margin-top: -1px;
    color: var(--color-text);
  }

  input::placeholder {
    color: var(--color-text);
    opacity: 0.38;
  }

  input#countryCode {
    flex: 3;
  }

  input#phoneNumber {
    flex: 12;
  }

  .active {
    background: var(--color-primary-bg);

    input,
    .svg-icon {
      color: var(--color-primary);
    }
  }
}

.confirm button {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 600;
  background-color: var(--color-primary-bg);
  color: var(--color-primary);
  border-radius: 8px;
  margin-top: 24px;
  transition: 0.2s;
  padding: 8px;
  width: 100%;
  width: 300px;

  &:hover {
    transform: scale(1.06);
  }

  &:active {
    transform: scale(0.94);
  }
}

.other-login {
  margin-top: 24px;
  font-size: 13px;
  color: var(--color-text);
  opacity: 0.68;

  a {
    padding: 0 8px;
  }
}

.notice {
  width: 300px;
  border-top: 1px solid rgba(128, 128, 128);
  margin-top: 48px;
  padding-top: 12px;
  font-size: 12px;
  color: var(--color-text);
  opacity: 0.48;
}

@keyframes loading {
  0% {
    opacity: 0.2;
  }

  20% {
    opacity: 1;
  }

  100% {
    opacity: 0.2;
  }
}

button.loading {
  height: 44px;
  cursor: unset;

  &:hover {
    transform: none;
  }
}

.loading span {
  width: 6px;
  height: 6px;
  background-color: var(--color-primary);
  border-radius: 50%;
  margin: 0 2px;
  animation: loading 1.4s infinite both;
}

.loading span:nth-child(2) {
  animation-delay: 0.2s;
}

.loading span:nth-child(3) {
  animation-delay: 0.4s;
}

.qr-code-container {
  background-color: var(--color-primary-bg);
  padding: 24px 24px 21px 24px;
  border-radius: 1.25rem;
  margin-bottom: 12px;
}

.qr-code-info {
  color: var(--color-text);
  text-align: center;
  margin-bottom: 28px;
}
</style>
