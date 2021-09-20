import React from "react";
import { useRouter } from "next/router";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import spacList from "src/files/shellcompanies.json";
import container from "./Search.container";

const HeaderTitle = (props: any) => {
  const { onShowNotification, classes } = props;

  const [value, setValue] = React.useState<number | null>(null);
  const router = useRouter();

  // const spacList = Object.values(spac);
  const onInputChangeHandler = (event: any) => {
  
    if (event.target.value && typeof event.target.value === "string") {
      // eslint-disable-next-line max-len
      const index = spacList.findIndex((x: any) =>
        x.symbol.toString().includes(event.target.value.toUpperCase())
      );
      setValue(index);
    }
  };

  const onChangeHandler = (event:any,val: any) => {
   
    if (val) {
      const index = spacList.findIndex((x: any) => x.symbol === val.symbol);
      setValue(index);
    }
  };

  const searchHandler = () => {
    // console.log('search handler: ', spacList[value].Symbol);
    // onSearchStart(spacList[value].Symbol, history);
  
    if (value !== null && spacList[value]) {
      const search = spacList[value].symbol;
      if (search) {
        router.push(`/view/${search}`);
      }
    } else {
      onShowNotification("error", `Symbol not available.`);
    }
  };

  return (
    <div className={classes.search}>
      <Autocomplete
        id="spac-search"
        options={spacList}
        getOptionLabel={(option: any) => option.symbol}
        freeSolo
        className={classes.searchBox}
        onInputChange={onInputChangeHandler}
        onChange={onChangeHandler}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search..."
            onKeyDown={(e: any) => {
              if (e.keyCode === 13 && e.target.value) {
                searchHandler();
              }
            }}
          />
        )}
      />
    </div>
  );
};

export default container(HeaderTitle);
