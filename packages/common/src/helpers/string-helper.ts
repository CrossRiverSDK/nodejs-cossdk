export function stringIsNullOrEmpty(str?:string):boolean
{
    if (str)
        return stringIsEmpty(str);
    else
        return true;
}

export function stringIsEmpty(str:string):boolean
{
    return str == '';
}