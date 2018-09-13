export async function loading(component, action) {
  try {
    component.setState({
      loading: true
    });

    await action();

  } catch (error) {
    component.setState({
      error: error
    });
  } finally {
    component.setState({
      loading: false
    });
  }
}
