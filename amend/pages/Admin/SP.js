
export default function SP(){
    const [serviceDetails, setServiceDetails] = React.useState([]);
  React.useEffect(() => {
    fetch("/api/user/emp/getEmp", {
      method: "GET",
    })
      .then((res) => {
        res
          .json()
          .then((services) => {
            console.log(services);
            setServiceDetails((prevState) => {
              return services.services;
            });
          })
          .catch((err) => {
            return;
          });
      })
      .catch((err) => {
        return;
      });
  }, []);
    return (<>
        <form>

        </form>
    </>);
}