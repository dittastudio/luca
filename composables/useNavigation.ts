export default function useNavigation(open: boolean) {
  const navigationOpen = useState<boolean>('navigationOpen')

  onMounted(() => {
    navigationOpen.value = open
  })

  return
}
