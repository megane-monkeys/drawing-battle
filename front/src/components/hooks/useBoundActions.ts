import {useMemo} from "react";
import {bindActionCreators} from "redux";
import { useDispatch } from "react-redux";

export const useBoundActions = (actions: any) => {
    const dispatch = useDispatch();
    return useMemo(() => {
        return bindActionCreators(
            actions,
            dispatch
        );
    }, [dispatch, actions]);
};
