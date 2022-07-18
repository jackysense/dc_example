define(["./when-54335d57","./Cartesian2-8646c5a1","./arrayRemoveDuplicates-3fea1e5f","./BoundingRectangle-07202124","./Transforms-79117a7b","./ComponentDatatype-1a100acd","./PolylineVolumeGeometryLibrary-4d0ebb44","./Check-24483042","./GeometryAttribute-374f805d","./GeometryAttributes-caa08d6c","./GeometryPipeline-571ff4c9","./IndexDatatype-82ceea78","./Math-d6182036","./PolygonPipeline-97a7160d","./VertexFormat-81ec7207","./RuntimeError-88a32665","./WebGLConstants-95ceb4e9","./EllipsoidTangentPlane-325a8e68","./IntersectionTests-5394f658","./Plane-13ae4b1b","./PolylinePipeline-3803a6c2","./EllipsoidGeodesic-cc216670","./EllipsoidRhumbLine-2b7999f3","./AttributeCompression-10c27d9c","./EncodedCartesian3-bf827957"],function(c,u,r,a,T,G,o,e,A,R,D,I,i,O,g,t,n,l,s,p,d,y,m,h,f){"use strict";var v={};function S(e,t){c.defined(v[e])||(v[e]=!0,console.warn(c.defaultValue(t,e)))}function b(e){var t=(e=c.defaultValue(e,c.defaultValue.EMPTY_OBJECT)).polylinePositions,n=e.shapePositions;this._positions=t,this._shape=n,this._ellipsoid=u.Ellipsoid.clone(c.defaultValue(e.ellipsoid,u.Ellipsoid.WGS84)),this._cornerType=c.defaultValue(e.cornerType,o.CornerType.ROUNDED),this._vertexFormat=g.VertexFormat.clone(c.defaultValue(e.vertexFormat,g.VertexFormat.DEFAULT)),this._granularity=c.defaultValue(e.granularity,i.CesiumMath.RADIANS_PER_DEGREE),this._workerName="createPolylineVolumeGeometry";t=1+t.length*u.Cartesian3.packedLength;t+=1+n.length*u.Cartesian2.packedLength,this.packedLength=t+u.Ellipsoid.packedLength+g.VertexFormat.packedLength+2}S.geometryOutlines="Entity geometry outlines are unsupported on terrain. Outlines will be disabled. To enable outlines, disable geometry terrain clamping by explicitly setting height to 0.",S.geometryZIndex="Entity geometry with zIndex are unsupported when height or extrudedHeight are defined.  zIndex will be ignored",S.geometryHeightReference="Entity corridor, ellipse, polygon or rectangle with heightReference must also have a defined height.  heightReference will be ignored",S.geometryExtrudedHeightReference="Entity corridor, ellipse, polygon or rectangle with extrudedHeightReference must also have a defined extrudedHeight.  extrudedHeightReference will be ignored",b.pack=function(e,t,n){var i;n=c.defaultValue(n,0);var r=e._positions,a=r.length;for(t[n++]=a,i=0;i<a;++i,n+=u.Cartesian3.packedLength)u.Cartesian3.pack(r[i],t,n);var o=e._shape,a=o.length;for(t[n++]=a,i=0;i<a;++i,n+=u.Cartesian2.packedLength)u.Cartesian2.pack(o[i],t,n);return u.Ellipsoid.pack(e._ellipsoid,t,n),n+=u.Ellipsoid.packedLength,g.VertexFormat.pack(e._vertexFormat,t,n),n+=g.VertexFormat.packedLength,t[n++]=e._cornerType,t[n]=e._granularity,t};var E=u.Ellipsoid.clone(u.Ellipsoid.UNIT_SPHERE),P=new g.VertexFormat,_={polylinePositions:void 0,shapePositions:void 0,ellipsoid:E,vertexFormat:P,cornerType:void 0,granularity:void 0};b.unpack=function(e,t,n){t=c.defaultValue(t,0);for(var i=e[t++],r=new Array(i),a=0;a<i;++a,t+=u.Cartesian3.packedLength)r[a]=u.Cartesian3.unpack(e,t);var i=e[t++],o=new Array(i);for(a=0;a<i;++a,t+=u.Cartesian2.packedLength)o[a]=u.Cartesian2.unpack(e,t);var l=u.Ellipsoid.unpack(e,t,E);t+=u.Ellipsoid.packedLength;var s=g.VertexFormat.unpack(e,t,P);t+=g.VertexFormat.packedLength;var p=e[t++],d=e[t];return c.defined(n)?(n._positions=r,n._shape=o,n._ellipsoid=u.Ellipsoid.clone(l,n._ellipsoid),n._vertexFormat=g.VertexFormat.clone(s,n._vertexFormat),n._cornerType=p,n._granularity=d,n):(_.polylinePositions=r,_.shapePositions=o,_.cornerType=p,_.granularity=d,new b(_))};var x=new a.BoundingRectangle;return b.createGeometry=function(e){var t=e._positions,n=r.arrayRemoveDuplicates(t,u.Cartesian3.equalsEpsilon),i=e._shape,i=o.PolylineVolumeGeometryLibrary.removeDuplicatesFromShape(i);if(!(n.length<2||i.length<3)){O.PolygonPipeline.computeWindingOrder2D(i)===O.WindingOrder.CLOCKWISE&&i.reverse();t=a.BoundingRectangle.fromPoints(i,x);return function(e,t,n,i){var r=new R.GeometryAttributes;i.position&&(r.position=new A.GeometryAttribute({componentDatatype:G.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:e}));var a,o,l,s,p,d=t.length,c=e.length/3,u=(c-2*d)/(2*d),g=O.PolygonPipeline.triangulate(t),y=(u-1)*d*6+2*g.length,m=I.IndexDatatype.createTypedArray(c,y),h=2*d,f=0;for(C=0;C<u-1;C++){for(a=0;a<d-1;a++)p=(o=2*a+C*d*2)+h,s=(l=o+1)+h,m[f++]=l,m[f++]=o,m[f++]=s,m[f++]=s,m[f++]=o,m[f++]=p;s=(l=(o=2*d-2+C*d*2)+1)+h,p=o+h,m[f++]=l,m[f++]=o,m[f++]=s,m[f++]=s,m[f++]=o,m[f++]=p}if(i.st||i.tangent||i.bitangent){for(var v,b,E=new Float32Array(2*c),P=1/(u-1),_=1/n.height,x=n.height/2,k=0,C=0;C<u;C++){for(b=_*(t[0].y+x),E[k++]=v=C*P,E[k++]=b,a=1;a<d;a++)b=_*(t[a].y+x),E[k++]=v,E[k++]=b,E[k++]=v,E[k++]=b;b=_*(t[0].y+x),E[k++]=v,E[k++]=b}for(a=0;a<d;a++)b=_*(t[a].y+x),E[k++]=v=0,E[k++]=b;for(a=0;a<d;a++)b=_*(t[a].y+x),E[k++]=v=(u-1)*P,E[k++]=b;r.st=new A.GeometryAttribute({componentDatatype:G.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:new Float32Array(E)})}var V=c-2*d;for(C=0;C<g.length;C+=3){var L=g[C]+V,w=g[C+1]+V,F=g[C+2]+V;m[f++]=L,m[f++]=w,m[f++]=F,m[f++]=F+d,m[f++]=w+d,m[f++]=L+d}if(e=new A.Geometry({attributes:r,indices:m,boundingSphere:T.BoundingSphere.fromVertices(e),primitiveType:A.PrimitiveType.TRIANGLES}),i.normal&&(e=D.GeometryPipeline.computeNormal(e)),i.tangent||i.bitangent){try{e=D.GeometryPipeline.computeTangentAndBitangent(e)}catch(e){S("polyline-volume-tangent-bitangent","Unable to compute tangents and bitangents for polyline volume geometry")}i.tangent||(e.attributes.tangent=void 0),i.bitangent||(e.attributes.bitangent=void 0),i.st||(e.attributes.st=void 0)}return e}(o.PolylineVolumeGeometryLibrary.computePositions(n,i,t,e,!0),i,t,e._vertexFormat)}},function(e,t){return(e=c.defined(t)?b.unpack(e,t):e)._ellipsoid=u.Ellipsoid.clone(e._ellipsoid),b.createGeometry(e)}});