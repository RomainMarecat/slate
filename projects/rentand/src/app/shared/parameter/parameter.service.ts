import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Parameter } from '../interfaces/parameter';

@Injectable({
  providedIn: 'root'
})
export class ParameterService {

  parameters: Parameter[];
  levelMap: Map<number, Parameter>;
  ageMap: Map<number, Parameter>;
  passionMap: Map<number, Parameter>;
  titleMap: Map<number, Parameter>;
  policyMap: Map<number, Parameter>;

  levelArray: Array<Parameter>;
  ageArray: Array<Parameter>;
  passionArray: Array<Parameter>;
  titleArray: Array<Parameter>;
  policyArray: Array<Parameter>;

  publicParametersUrl = `${environment.middleware}/v1/parameters`;

  constructor(private http: HttpClient) {
    this.levelMap = new Map<number, Parameter>();
    this.ageMap = new Map<number, Parameter>();
    this.passionMap = new Map<number, Parameter>();
    this.titleMap = new Map<number, Parameter>();
    this.policyMap = new Map<number, Parameter>();

    this.levelArray = new Array<Parameter>();
    this.ageArray = new Array<Parameter>();
    this.passionArray = new Array<Parameter>();
    this.titleArray = new Array<Parameter>();
    this.policyArray = new Array<Parameter>();

    this.getAllParameters()
      .subscribe((parameters) => {
        this.parameters = parameters;
        parameters.forEach((parameter: Parameter) => {
          if (parameter.type === 'level') {
            this.levelMap.set(parameter.sort, parameter);
            this.levelArray.push(parameter);
          } else if (parameter.type === 'age') {
            this.ageMap.set(parameter.sort, parameter);
            this.ageArray.push(parameter);
          } else if (parameter.type === 'passion') {
            this.passionMap.set(parameter.sort, parameter);
            this.passionArray.push(parameter);
          } else if (parameter.type === 'title') {
            this.titleMap.set(parameter.sort, parameter);
            this.titleArray.push(parameter);
          } else if (parameter.type === 'cancel') {
            this.policyMap.set(parameter.sort, parameter);
            this.policyArray.push(parameter);
          }
        });
      });
  }

  getAllParametersByType(type: string): Observable<Parameter[]> {
    const url = `${this.publicParametersUrl}/type/` + type;
    return this.http.get<Parameter[]>(url);
  }

  getAllParametersByTypeSorted(type: string, sort: string): Observable<Parameter[]> {
    const url = `${this.publicParametersUrl}/type/` + type + `?sort=` + sort;
    return this.http.get<Parameter[]>(url);
  }

  getAllParameters(): Observable<Parameter[]> {
    const url = `${this.publicParametersUrl}`;
    return this.http.get<Parameter[]>(url);
  }

  getParameters(type: string): Parameter[] {
    if (type === 'level') {
      return this.levelArray;
    } else if (type === 'age') {
      return this.ageArray;
    } else if (type === 'passion') {
      return this.passionArray;
    } else if (type === 'title') {
      return this.titleArray;
    } else if (type === 'policy') {
      return this.policyArray;
    }
    return undefined;
  }

  getLevelParameter(sort: number): Parameter {
    return this.levelMap.get(sort);
  }

  getAgeParameter(sort: number): Parameter {
    return this.ageMap.get(sort);
  }

  getPassionParameter(sort: number): Parameter {
    return this.passionMap.get(sort);
  }

  getTitleParameter(sort: number): Parameter {
    return this.titleMap.get(sort);
  }

  getPolicyParameter(sort: number): Parameter {
    return this.policyMap.get(sort);
  }
}
