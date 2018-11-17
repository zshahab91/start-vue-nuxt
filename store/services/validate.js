import Vue from 'vue';
export function checkRes (data) {

  switch (data.status) {
    case 200:
      return true
      break
    case 404:
      $nuxt.$router.push('/pages/404')
      break
    case 500:
      $nuxt.$router.push('/pages/500')
      break;
    default:
      return true
  }
}
