<template>
  <div class="login">
    <div class="login-container">
      <div class="section-1">
        <img src="/img/netease-music.png" />
      </div>
      <div class="title">网易云登录</div>
      <div>
        <div class="section-2" v-if="loginType === 0">
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
          <div class="input-box">
            <div class="container">
              <div class="inputs">
                <input id="captcha" class=" md:w-3/4" type="captcha" v-model="formState.captcha" @blur="inputFocus = ''"
                  @keyup.enter="login" />
                <div @click="sentCaptchaFn">验证码</div>
              </div>
            </div>
          </div>
          <div class="confirm">
            <button @click="login">
              登录
            </button>
          </div>
        </div>
        <div v-else>
          <img :src="qrimg" alt="">
          <span>{{ qrCodeInformation }}</span>
        </div>
      </div>
      <div>
        <span class="cursor-pointer" @click="loginOption">{{ loginTypeName }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, toRefs } from 'vue';
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { sentCaptcha, lgoinQrKey, qrCreate, qrCheck } from '@/api/login'
export default defineComponent({
  name: '_Login',
  setup: function () {
    const store = useStore()
    const router = useRouter()
    const countryCode = ref('+86')
    const state = reactive({
      loginType: 0,
      loginTypeName: '二维码登录',
      qrimg: '',
      qrCodeCheckInterval: null,
      qrCodeInformation: ''
    })
    const formState = reactive({
      phone: '17705687917',
      password: 'LyMBoy48',
      captcha: '',
    });
    const sentCaptchaFn = () => {
      sentCaptcha({ phone: formState.phone }).then(res => {
        console.log(res, 'res==========');
      })
    }
    const loginOption = () => {
      if (state.loginType === 0) {
        state.loginType = 1
        state.loginTypeName = '手机号登录'
        lgoinQrKey({ timestamp: new Date().getTime(), }).then(res => {
          if (res.code === 200) {
            qrCreate({ key: res.data.unikey, qrimg: 'qrimg', timestamp: new Date().getTime(), }).then(res => {
              if (res.code === 200) {
                state.qrimg = res.data.qrimg
              }
            })
            checkQrCodeLogin(res.data.unikey);
          }
        })
      } else if (state.loginType === 1) {
        state.loginType = 0
        state.loginTypeName = '二维码登录'
        clearInterval(state.qrCodeCheckInterval);
      }
    }
    const checkQrCodeLogin = (key) => {
      state.qrCodeCheckInterval = setInterval(() => {
        qrCheck({ key, timestamp: new Date().getTime() }).then(res => {
          if (res.code === 801) {
            state.qrCodeInformation = '打开网易云音乐APP扫码登录';
          } else if (res.code === 802) {
            state.qrCodeInformation = '扫描成功，请在手机上确认登录';
          } else if (res.code === 803) {
            clearInterval(state.qrCodeCheckInterval);
            state.qrCodeInformation = '登录成功，请稍等...';
            store.dispatch('qrLogin', res.cookie)
              .then(() => {
                router.push('/home')
              })
              .catch(() => {
                // message.error(err.message)
              })
          }
        })
      }, 1000)
    }
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
      ...toRefs(state),
      login,
      countryCode,
      sentCaptchaFn,
      loginOption
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
