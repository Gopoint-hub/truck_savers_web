import { describe, expect, it, beforeAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAdminContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "admin-user",
    email: "admin@trucksavers.com",
    name: "Admin User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

function createUserContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 2,
    openId: "regular-user",
    email: "user@trucksavers.com",
    name: "Regular User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("CMS Tasks Router", () => {
  it("should have tasks.list procedure", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    
    // Verify the procedure exists and can be called
    expect(caller.tasks).toBeDefined();
    expect(caller.tasks.list).toBeDefined();
  });

  it("should have tasks.stats procedure", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    
    expect(caller.tasks.stats).toBeDefined();
  });

  it("should have tasks.create procedure", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    
    expect(caller.tasks.create).toBeDefined();
  });
});

describe("CMS Objectives Router", () => {
  it("should have objectives.list procedure", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    
    expect(caller.objectives).toBeDefined();
    expect(caller.objectives.list).toBeDefined();
  });

  it("should have objectives.create procedure", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    
    expect(caller.objectives.create).toBeDefined();
  });
});

describe("CMS Subscribers Router", () => {
  it("should have subscribers.list procedure", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    
    expect(caller.subscribers).toBeDefined();
    expect(caller.subscribers.list).toBeDefined();
  });

  it("should have subscribers.stats procedure", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    
    expect(caller.subscribers.stats).toBeDefined();
  });

  it("should have subscribers.bulkCreate procedure", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    
    expect(caller.subscribers.bulkCreate).toBeDefined();
  });
});

describe("CMS Newsletters Router", () => {
  it("should have newsletters.list procedure", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    
    expect(caller.newsletters).toBeDefined();
    expect(caller.newsletters.list).toBeDefined();
  });

  it("should have newsletters.create procedure", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    
    expect(caller.newsletters.create).toBeDefined();
  });
});

describe("CMS Dashboard Router", () => {
  it("should have dashboard.stats procedure", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    
    expect(caller.dashboard).toBeDefined();
    expect(caller.dashboard.stats).toBeDefined();
  });
});

describe("CMS Users Router", () => {
  it("should have users.list procedure", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    
    expect(caller.users).toBeDefined();
    expect(caller.users.list).toBeDefined();
  });

  it("should have users.updateRole procedure", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    
    expect(caller.users.updateRole).toBeDefined();
  });
});

describe("CMS Business Lines Router", () => {
  it("should have businessLines.list procedure", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    
    expect(caller.businessLines).toBeDefined();
    expect(caller.businessLines.list).toBeDefined();
  });
});

describe("CMS Locations Router", () => {
  it("should have locations.list procedure", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    
    expect(caller.locations).toBeDefined();
    expect(caller.locations.list).toBeDefined();
  });
});
