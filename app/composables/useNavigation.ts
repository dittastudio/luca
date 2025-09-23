export default function useNavigation(initial: boolean) {
  const navigationOpen = useState<boolean>('navigationOpen')
  const dropdownOpen = useState<string | null>('dropdownOpen')

  onMounted(() => {
    navigationOpen.value = initial
    dropdownOpen.value = null
  })

  const router = useRouter()

  router.afterEach(async (to, from) => {
    if (from.path !== to.path) {
      await wait(250)
    }

    navigationOpen.value = false
    dropdownOpen.value = null
  })
}
