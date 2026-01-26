export const risksLoadRoutes = async () => {
    let components = [];
    try {
      let { AppShared } = await import("@4eplatform/shared");
      components.push(AppShared);
    } catch (error) {
      console.error("Error loading shared:", error);
    }
    
      try {
        let { Circulars } = await import("@4eplatform/circulars");
        components.push(Circulars);
      } catch (error) {
        console.error("Error loading circulars:", error);
      }
      try {
        let { Connect } = await import("@4eplatform/connect");
        components.push(Connect);
      } catch (error) {
        console.error("Error loading circulars:", error);
      }
    return components;
};
