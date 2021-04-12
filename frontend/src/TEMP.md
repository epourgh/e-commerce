AddPageToViewed
ActionType.ADD_PAGE_TO_VIEWED

interface AddPageToViewedAction {
    type: ActionType.ADD_PAGE_TO_VIEWED;
    payload: { id: number, qty: number, product: ShopList };
}

ViewedPageReducer