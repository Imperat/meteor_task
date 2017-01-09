checkEmailIsValid = function (aString) {
  aString = aString || '';
  return aString.length > 1 && aString.indexOf('@') > -1;
}

checkPasswordIsValid = function (aString) {
  aString = aString || '';
  return aString.length > 7;
}

updateQueryStringBySort = function(initialQuery, sortingField){
  if (initialQuery.name !== undefined){
    return 'name=' + initialQuery.name + '&sort_by=' + sortingField;
  }
  if (initialQuery.client !== undefined){
    return 'client=' + initialQuery.client + '&sort_by=' + sortingField;
  }
  if (initialQuery.ownerEMail !== undefined){
    return 'ownerEMail=' + initialQuery.ownerEMail + '&sort_by=' + sortingField;
  }
  return 'sort_by=' + sortingField;
}

updateQueryStringByFilter = function(initialQuery, filterField, filterValue){
  if (initialQuery.sort_by !== undefined){
    return filterField + '=' + filterValue + '&sort_by=' + initialQuery.sort_by;
  }
  return filterField + '=' + filterValue;
}

removeFiltersFromQueryString = function(initialQuery){
  if (initialQuery.sort_by !== undefined){
    return 'sort_by=' + initialQuery.sort_by;
  }
  return '';
}
