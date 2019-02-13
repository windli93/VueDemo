package cn.com.github.springVue.dao;

/**
 * @description:
 * @author: ragrokli
 * @create: 2019-01-07 21:35
 **/
public class ReferenceCountingGc {

      public Object instance = null;
      private static final int _1MB = 1024 * 1024;
      private byte[] bigSize = new byte[2 * _1MB];

      public static void testGc(){
          ReferenceCountingGc objA = new ReferenceCountingGc();
          ReferenceCountingGc objB = new ReferenceCountingGc();
          objA.instance = objB;
          objB.instance = objA;

          objA = null;
          objB = null;

          System.gc();
      }
}
