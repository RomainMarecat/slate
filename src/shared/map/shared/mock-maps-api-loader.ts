export class MockMapsAPILoader {
  public load(): Promise<boolean> {
    return new Promise(() => {
      return true;
    });
  }
}
