class Cube extends cgIShape{
	constructor(a){
		super(),
		this.makeCube(a)
	}
	makeCube(a){
		a<1&&(a=1);
		var d=-.5,s=-.5,t=1/a,i=0;
		for(i=0;i<a;i++){
			var h,r=i*t;
			for(h=0;h<a;h++){
				var n=h*t;
				this.addTriangle(d+n,s+r,.5,d+n+t,s+r,.5,d+n+t,s+r+t,.5),
				this.addNormal(0,0,1,0,0,1,0,0,1),
				this.adduv(n,r,n+t,r,n+t,r+t),

				this.addTriangle(d+n+t,s+r+t,.5,d+n,s+r+t,.5,d+n,s+r,.5),
				this.addNormal(0,0,1,0,0,1,0,0,1),
				this.adduv(n+t,r+t,n,r+t,n,r),

				this.addTriangle(d+n,s+r,-.5,d+n+t,s+r+t,-.5,d+n+t,s+r,-.5),
				this.addNormal(0,0,-1,0,0,-1,0,0,-1),
				this.adduv(n,r,n+t,r+t,n+t,r),

				this.addTriangle(d+n,s+r,-.5,d+n,s+r+t,-.5,d+n+t,s+r+t,-.5),
				this.addNormal(0,0,-1,0,0,-1,0,0,-1),
				this.adduv(n,r,n,r+t,n+t,r+t),

				this.addTriangle(-.5,s+r,d+n,-.5,s+r,d+n+t,-.5,s+r+t,d+n+t),
				this.addNormal(-1,0,0,-1,0,0,-1,0,0),
				this.adduv(n,r,n+t,r,n+t,r+t),

				this.addTriangle(-.5,s+r+t,d+n+t,-.5,s+r+t,d+n,-.5,s+r,d+n),
				this.addNormal(-1,0,0,-1,0,0,-1,0,0),
				this.adduv(n+t,r+t,n,r+t,n,r),

				this.addTriangle(.5,s+r,d+n+t,.5,s+r,d+n,.5,s+r+t,d+n),
				this.addNormal(1,0,0,1,0,0,1,0,0),
				this.adduv(n+t,r,n,r,n,r+t),

				this.addTriangle(.5,s+r+t,d+n,.5,s+r+t,d+n+t,.5,s+r,d+n+t),
				this.addNormal(1,0,0,1,0,0,1,0,0),
				this.adduv(n,r+t,n+t,r+t,n+t,r),

				this.addTriangle(d+n,.5,s+r+t,d+n+t,.5,s+r+t,d+n,.5,s+r),
				this.addNormal(0,1,0,0,1,0,0,1,0),
				this.adduv(n,r+t,n+t,r+t,n,r),

				this.addTriangle(d+n,.5,s+r,d+n+t,.5,s+r+t,d+n+t,.5,s+r),
				this.addNormal(0,1,0,0,1,0,0,1,0),
				this.adduv(n,r,n+t,r+t,n+t,r),

				this.addTriangle(d+n,-.5,s+r,d+n+t,-.5,s+r+t,d+n,-.5,s+r+t),
				this.addNormal(0,-1,0,0,-1,0,0,-1,0),
				this.adduv(n,r,n+t,r+t,n,r+t),

				this.addTriangle(d+n,-.5,s+r,d+n+t,-.5,s+r,d+n+t,-.5,s+r+t),
				this.addNormal(0,-1,0,0,-1,0,0,-1,0),
				this.adduv(n,r,n+t,r,n+t,r+t)
			}
		}
	}
}
