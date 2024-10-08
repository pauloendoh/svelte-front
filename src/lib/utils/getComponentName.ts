export function getComponentName(component: any): string {
  let name: string

  if (typeof component === 'string') {
    name = component
  } else {
    name = component.name
  }

  // name example: Proxy<SaveTodoModal>
  if (name.includes('<')) {
    return name.split('<')[1].replace('>', '')
  }

  return name
}
