export type HttpQueryValue = string | number | Date | null | boolean;
export type HttpQuery = { [key: string]: Array<HttpQueryValue> };

export class QueryString
{
    private data:HttpQuery;

    constructor(){
        this.data = {};
    }

    add(key: string, value: HttpQueryValue | Array<HttpQueryValue>)
    {
        if (key in this.data)
        {
            const arr = this.data[key];
            
            const newValues = value instanceof Array ? value : new Array(value);

            newValues.forEach(newValue => arr.push(newValue));

            this.data[key] = arr;
        }
        else
            this.set(key, value);
    }

    set(key: string, value: HttpQueryValue | Array<HttpQueryValue>)
    {
        if (value instanceof Array)
            this.data[key] = value;
        else
            this.data[key] = new Array(value);
    }

    remove(key: string)
    {
        delete this.data[key];
    }

    toString(prefix = '?'): string {
        return prefix + 
            Object
                .keys(this.data)
                .map(key => {
                    const value = this.data[key];
                    const multiValue = value.map(singleValue => {
                                                if (singleValue instanceof Date)
                                                    return singleValue.toISOString();
                                                else
                                                    return encodeURIComponent(String(singleValue))
                                            })
                                            .join(`&${encodeURIComponent(key)}=`);
                    return `${encodeURIComponent(key)}=${multiValue}`;
                })
                .join('&');
    }
}
