export default function ({ route,store }) {
  if(route && route.path!='/fr' && route.path!='' && route.path!='/'){
     store.dispatch('ui/setShowHeaderSearch', true);
  }
}
