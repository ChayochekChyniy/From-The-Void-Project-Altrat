function GeyserProp(name, it, et)
{
 let block = extend(Prop, name, {
  size: 1,

  idleTime: it,
  eruptTime: et,
  update: true,

  load()
  {
   this.super$load();
  }
 })

 block.buildType = () => extend(Building, {
  tim: 0,
  erupting: false,

  updateTile()
  {
   this.super$updateTile();

   this.tim += Time.delta;

   if(!this.erupting)
   {
    if(this.tim >= block.idleTime)
    {
     this.erupting = true;
     this.tim = 0;

     Fx.smokeAoeCloud.at(this.x, this.y);
    }
   }
   else
   {
    if(this.tim % 6 < 1)
    {
     Fx.magmasmoke.at(this.x, this.y);
    }

    if(this.tim>= block.eruptTime)
    {
     this.erupting = false;
     this.tim = 0;
    }
   }
  },

  write(write)
  {
   this.super$write(write);
   write.f(this.tim);
   write.bool(this.erupting);
  },

  read(read, revision)
  {
   this.super$read(read, revision);
   this.tim= read.f();
   this.erupting = read.bool();
  }
 })

 return block
}

let GeyserPropBasic = new GeyserProp("geyser", 300, 60) 
GeyserPropBasic.buildVisibility = BuildVisibility.shown
